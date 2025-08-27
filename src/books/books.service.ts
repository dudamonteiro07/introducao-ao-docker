
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class BooksService {
  constructor(private prisma: PrismaService) { }

  create(data: Prisma.BooksCreateInput) {
    return this.prisma.books.create({ data });
  }


  findAll() {
    return this.prisma.books.findMany();
  }

  async findOne(id: string) {
    const books = await this.prisma.books.findUnique({
      where: { id }
    })

    if (!books) {
      throw new NotFoundException(`book com ${id}, não encontrado!`)
    }

    return books
  }


  async update(id: string, data: Prisma.BooksUpdateInput) {
    const books = await this.prisma.books.findUnique({
      where: { id }

    })


    if (!books) {
      throw new NotFoundException(`Livro com id ${id} não encontrado!`);
    }
    return await this.prisma.books.update({
      where: { id },
      data,
    });
  }
  async remove(id: string) {
    const book = await this.prisma.books.findUnique({
      where: { id }
    });
    if (!book) throw new NotFoundException(`Book com id ${id} não encontrado!`);
    return await this.prisma.books.delete({ where: { id } });
  }
}

