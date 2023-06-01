import { Injectable } from '@nestjs/common';
import { createApi } from 'unsplash-js';
import { UNSPLASH_ACCESS_KEY } from '../config/config';

@Injectable()
export class UnsplashService {
  private unsplash;

  constructor() {
    this.unsplash = createApi({
      accessKey: UNSPLASH_ACCESS_KEY,
    });
  }

  async generatePictureByName(name: string): Promise<any> {
    const response = await this.unsplash.search.getPhotos({
      query: name,
      perPage: 1, // Mengambil satu foto saja
      orientation: 'landscape', // Menentukan orientasi foto yang diambil
      orderBy: 'relevant', // Mengurutkan foto berdasarkan relevansi
    });
  
    if (response.errors) {
      throw new Error('Failed to fetch pictures from Unsplash API.');
    }
  
    const { results } = response.response;
    if (results.length === 0) {
      throw new Error('No pictures found for the specified query.');
    }
  
    const randomPicture = results[0]; // Mengambil foto pertama dari hasil pencarian
    return randomPicture;
  }
}