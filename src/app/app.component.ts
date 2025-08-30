import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  images: { url: string; caption: string }[] = [];
  selectedImage: { url: string; caption: string } | null = null;
  newImagePreview: string | null = null;
  newCaption: string = '';
  currentIndex: number = -1;
  imageToDelete: number | null = null;
  showConfirmModal: boolean = false;
  selectedIndex: number | null = null;
  constructor() {
    const saved = localStorage.getItem('gallery');
    if (saved) {
      this.images = JSON.parse(saved);
    } else {
      this.images = [
        {
          url: 'https://adventuresofthe4jls.com/wp-content/uploads/2023/07/img_5386.jpeg',
          caption: 'Mountain View',
        },
        {
          url: 'https://media.istockphoto.com/id/480496478/photo/hong-kong-central-district-at-night.jpg?s=612x612&w=0&k=20&c=-eUEtqjiZa7iicdmD7SOuuCKzkmgY2LXbN3LYTyZDOo=',
          caption: 'City Lights',
        },
        {
          url: 'https://media.istockphoto.com/id/1981164982/photo/beautiful-view-of-blue-sea-or-ocean-by-the-white-beach-in-summer-okinawa-in-japan-nobody.jpg?s=612x612&w=0&k=20&c=9f7Ky-UHJYM9YPHWc1uYW663uIiPQOLleHtAyZ3iQtI=',
          caption: 'Ocean Breeze',
        },
        {
          url: 'https://media.istockphoto.com/id/152538687/photo/morning-light.jpg?s=612x612&w=0&k=20&c=W-sIciYQnwZXpTxuwp7Lj-2VIwLCRepiys6HYfbvzQ0=',
          caption: 'Forest Trail',
        },
        {
          url: 'https://img.freepik.com/free-photo/cliffs-caves-desert-full-dry-grass-cloudy-sky-daytime_181624-27961.jpg?semt=ais_hybrid&w=740',
          caption: 'Desert Sky',
        },
        {
          url: 'https://images.pexels.com/photos/140234/pexels-photo-140234.jpeg?cs=srgb&dl=pexels-sandy-140234.jpg&fm=jpg',
          caption: 'Snow Peaks',
        },
      ];
    }
  }

  handleFileChange(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.newImagePreview = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  addImage() {
    if (this.newImagePreview && this.newCaption) {
      this.images.push({
        url: this.newImagePreview,
        caption: this.newCaption,
      });
      localStorage.setItem('gallery', JSON.stringify(this.images));

      this.newImagePreview = null;
      this.newCaption = '';
    }
  }

  openModal(image: { url: string; caption: string }, index: number) {
    this.selectedImage = image;
    this.selectedIndex = index;
  }

  // Next / Previous

  nextImage() {
    if (this.selectedIndex !== null) {
      this.selectedIndex = (this.selectedIndex + 1) % this.images.length;
      this.selectedImage = this.images[this.selectedIndex];
    }
  }

  prevImage() {
    if (this.selectedIndex !== null) {
      this.selectedIndex =
        (this.selectedIndex - 1 + this.images.length) % this.images.length;
      this.selectedImage = this.images[this.selectedIndex];
    }
  }

  closeModal() {
    this.selectedImage = null;
    this.selectedIndex = null;
  }

  confirmDelete(index: number) {
    this.imageToDelete = index;
    this.showConfirmModal = true;
  }

  cancelDelete() {
    this.imageToDelete = null;
    this.showConfirmModal = false;
  }

  deleteImage() {
    if (this.imageToDelete !== null) {
      this.images.splice(this.imageToDelete, 1);
      localStorage.setItem('gallery', JSON.stringify(this.images));
    }
    this.cancelDelete(); // close modal
  }

  @HostListener('document:keydown', ['$event'])
  handleKeyboard(event: KeyboardEvent) {
    if (this.showConfirmModal) {
      if (event.key === 'Escape') this.cancelDelete();
    } else if (this.selectedImage) {
      if (event.key === 'Escape') this.closeModal();
      if (event.key === 'ArrowRight') this.nextImage();
      if (event.key === 'ArrowLeft') this.prevImage();
    }
  }
}
