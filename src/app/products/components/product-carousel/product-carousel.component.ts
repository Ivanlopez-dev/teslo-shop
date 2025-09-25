import { AfterViewInit, Component, ElementRef, input, OnChanges, SimpleChanges, viewChild } from '@angular/core';
import Swiper from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';

import { ProductImagePipe } from '@products/pipes/product-image.pipe';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

@Component({
  selector: 'product-carousel',
  imports: [ProductImagePipe],
  templateUrl: './product-carousel.component.html',
  styles: `
    .swiper {
      width: 100%;
      height: 500px;
    }
  `
})
export class ProductCarouselComponent implements AfterViewInit, OnChanges {
  images = input.required<string[]>();
  swiperDiv = viewChild.required<ElementRef>('swiperDiv');
  swiper: Swiper | undefined = undefined;

  // Array para mostrar múltiples slides cuando no hay imágenes (necesario para Swiper)
  defaultSlides = [1, 2, 3];

  shouldShowNavigation(): boolean {
    return this.images().length > 1;
  }

  ngAfterViewInit(): void {
    this.swiperInit();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['images'].firstChange) {
      return;
    }

    if (!this.swiper) return;

    this.swiper.destroy(true, true);
    this.swiperInit();
  }

  swiperInit() {
    const element = this.swiperDiv().nativeElement;
    if (!element) return;

    const hasMultipleImages = this.images().length > 1;

    this.swiper = new Swiper(element, {
      // Optional parameters
      direction: 'horizontal',
      loop: hasMultipleImages, // Sólo activar loop si hay múltiples imágenes

      modules: [Navigation, Pagination],

      // If we need pagination
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
        enabled: hasMultipleImages // Sólo habilitar paginación si hay múltiples imágenes
      },

      // Navigation arrows
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
        enabled: hasMultipleImages // Sólo habilitar navegación si hay múltiples imágenes
      },

      // Scrollbar
      scrollbar: {
        el: '.swiper-scrollbar',
      },

      // Configuración adicional para casos con pocas imágenes
      allowTouchMove: hasMultipleImages, // Sólo permitir deslizar si hay múltiples imágenes
      autoplay: false
    });
  }
}
