import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet,CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'jvl_tailwind';
  images = [
    {
      url: 'https://adventuresofthe4jls.com/wp-content/uploads/2023/07/img_5386.jpeg',
      caption: 'Mountain View'
    },
    {
      url: 'https://media.istockphoto.com/id/480496478/photo/hong-kong-central-district-at-night.jpg?s=612x612&w=0&k=20&c=-eUEtqjiZa7iicdmD7SOuuCKzkmgY2LXbN3LYTyZDOo=',
      caption: 'City Lights'
    },
    {
      url: 'https://media.istockphoto.com/id/1981164982/photo/beautiful-view-of-blue-sea-or-ocean-by-the-white-beach-in-summer-okinawa-in-japan-nobody.jpg?s=612x612&w=0&k=20&c=9f7Ky-UHJYM9YPHWc1uYW663uIiPQOLleHtAyZ3iQtI=',
      caption: 'Ocean Breeze'
    },
    {
      url: 'https://media.istockphoto.com/id/152538687/photo/morning-light.jpg?s=612x612&w=0&k=20&c=W-sIciYQnwZXpTxuwp7Lj-2VIwLCRepiys6HYfbvzQ0=',
      caption: 'Forest Trail'
    },
    {
      url: 'https://img.freepik.com/free-photo/cliffs-caves-desert-full-dry-grass-cloudy-sky-daytime_181624-27961.jpg?semt=ais_hybrid&w=740',
      caption: 'Desert Sky'
    },
    {
      url: 'https://images.pexels.com/photos/140234/pexels-photo-140234.jpeg?cs=srgb&dl=pexels-sandy-140234.jpg&fm=jpg',
      caption: 'Snow Peaks'
    }
  ];
  selectedImage: { url: string, caption: string } | null = null;
  newImagePreview: string | null = null;
  newCaption: string = '';

  openModal(image: { url: string, caption: string }) {
    this.selectedImage = image;
  }

  closeModal() {
    this.selectedImage = null;
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
      this.newImagePreview = null;
      this.newCaption = '';
    }
  }
}
