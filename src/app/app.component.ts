import { NgClass, NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  imports:[NgClass,NgFor,NgIf],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  images: any[] = [];
  loading = false;
  selectedImage: any = null;
  titles = [
    "Prashant ", "Simran", "Simran", "Simran", "Simran",
    "Simran", "Prashant", "Simran", "Simran", "Simran",
    "Simran", "Simran", "Simran", "Prashant", "Prashant",
    "Prashant", "Prashant and Simran", "Simran", "Prashant and Simran", "Prashant and Simran"
    , "Prashant and Simran", "Prashant and Simran" , "Prashant and Simran", "Prashant and Simran" 
  ];
  descriptions = [
    "A breathtaking view that captures nature's grandeur",
    "Where earth meets sky in perfect harmony",
    "The dance of light on water's surface",
    "Urban sophistication captured in a frame",
    "The quiet beauty of nature's pathways",
    "Endless sands telling timeless stories",
    "The powerful elegance of falling water",
    "Nature's vibrant colors on full display",
    "The serene beauty of winter's touch",
    "New beginnings in every petal",
    "Warmth and joy in golden hues",
    "The cosmos reflected in earthly beauty",
    "Nature's delicate morning jewelry",
    "Where land and sea embrace",
    "Peaks shrouded in mystical fog",
    "The simple elegance of rural life",
    "The pulsating energy of city nights",
    "A fleeting moment with nature's wonders",
    "Colorful blooms in perfect arrangement",
    "The world mirrored in liquid glass",
    "Human ingenuity reaching for the sky",
    "A feast for both eyes and palate",
    "The call of distant places",
    "Traditions preserved through generations",
    "Creativity made visible"
  ];

  ngOnInit(): void {
    this.loadInitialImages();
  }

  loadInitialImages() {
    for (let i = 1; i <= 57; i++) {
      this.images.push({
        path: `assets/img${i}.jpg`,
        title: this.titles[i-1],
        description: this.descriptions[i-1],
        likes: Math.floor(Math.random() * 100) + 20,
        liked: false,
        featured: i % 5 === 0 // Every 5th image is featured
      });
    }
  }

 toggleLike(index: number) {
  const image = this.images[index];
  image.liked = !image.liked;
  image.likes += image.liked ? 1 : -1;

  // Add temporary animation class
  const button = document.querySelectorAll('.gallery-btn')[index];
  button?.classList.add('liked-animation');

  setTimeout(() => {
    button?.classList.remove('liked-animation');
  }, 400);
}


  loadMore() {
    this.loading = true;
    // Simulate API call
    setTimeout(() => {
      const currentLength = this.images.length;
      for (let i = 1; i <= 5; i++) {
        const newIndex = currentLength + i;
        this.images.push({
          path: `assets/img${(newIndex % 25) || 25}.jpg`, // Cycle through images
          title: `New ${this.titles[newIndex % this.titles.length]}`,
          description: this.descriptions[newIndex % this.descriptions.length],
          likes: Math.floor(Math.random() * 50) + 10,
          liked: false,
          featured: newIndex % 7 === 0
        });
      }
      this.loading = false;
    }, 1500);
  }

  openLightbox(image: any) {
    this.selectedImage = image;
    document.body.style.overflow = 'hidden';
  }

  closeLightbox() {
    this.selectedImage = null;
    document.body.style.overflow = '';
  }

  downloadImage(image: any) {
    // In a real app, this would trigger a download
    console.log(`Downloading ${image.title}`);
    // Simulate download
    const link = document.createElement('a');
    link.href = image.path;
    link.download = image.title.replace(/\s+/g, '-').toLowerCase() + '.jpg';
    link.click();
  }
}