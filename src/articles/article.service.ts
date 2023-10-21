/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Article } from './article.model';
import { Connection } from 'mongoose';

@Injectable()
export class ArticleService {
  constructor(@InjectModel('Article') private readonly articleModel: Model<Article>) {}

  async createArticle(articleDto: Partial<Article>): Promise<boolean> {
    const newArticle = new this.articleModel(articleDto);
    await newArticle.save();
    return true;
  }

  async getAllArticles(): Promise<Article[]> {
    return await this.articleModel.find().exec();
  }

  async findArticlesByTitle(keyword: string): Promise<Article[]> {
    return await this.articleModel.find({ title: new RegExp(keyword, 'i') }).exec();
  }
  


}
