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
    const res = await this.articleModel.find().lean().exec();
    const res1 = res.map(i => { i.id = i._id.toString(); return i });
    return res1;
  }

  async findArticlesByTitle(keyword: string): Promise<Article[]> {
    return await this.articleModel.find({ title: new RegExp(keyword, 'i') }).exec();
  }
  
  async approveArticleById(id: string): Promise<boolean> {
    const res = await this.articleModel.updateOne({ _id: id }, { $set: { approved: true, rejected: false } }).exec();
    return res.modifiedCount > 0;
  }

  async rejectArticleById(id: string): Promise<boolean> {
    const res = await this.articleModel.updateOne({ _id: id }, { $set: { approved: false, rejected: true } }).exec();
    return res.modifiedCount > 0;
  }


}
