import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { routes } from './app.routes';
const firebaseConfig = {
  apiKey: "AIzaSyCZkw7GBAXrj0NtBOHagZ214y6QSFYOFr0",
  authDomain: "img-gallery-7de0b.firebaseapp.com",
  projectId: "img-gallery-7de0b",
  storageBucket: "img-gallery-7de0b.firebasestorage.app",
  messagingSenderId: "534460125919",
  appId: "1:534460125919:web:3aed74fd3b277f77198f6a",
  measurementId: "G-4LSPYGZ4G0"
};
export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideFirestore(() => getFirestore()),
  ],
};
