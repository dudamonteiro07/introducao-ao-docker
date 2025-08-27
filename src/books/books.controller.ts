import { Body, Controller, Get, Post, Put, Delete, Param } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { BooksService } from './books.service';
import { Prisma } from '@prisma/client';
import { CreateBooksDTO } from './Dto/create-books.dto';

@ApiTags('Books')
@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}


  @Get()
  @ApiOperation({ summary: 'Retorna todos os livros' })
  @ApiResponse({ status: 200, description: 'Lista de livros retornada com sucesso.' })
  async findAll() {
    return this.booksService.findAll();
  }

  
  @Get(':id')
  @ApiOperation({ summary: 'Retorna um livro pelo ID' })
  @ApiResponse({ status: 200, description: 'Livro retornado com sucesso.' })
  @ApiResponse({ status: 404, description: 'Livro não encontrado.' })
  async findOne(@Param('id') id: string) {
    return this.booksService.findOne(id);
  }

  
  @Post()
  @ApiOperation({ summary: 'Cria um novo livro' })
  @ApiResponse({ status: 201, description: 'Livro criado com sucesso.' })
  async create(@Body() data: CreateBooksDTO) {
    return this.booksService.create(data);
  }

  
  @Put(':id')
  @ApiOperation({ summary: 'Atualiza um livro pelo ID' })
  @ApiResponse({ status: 200, description: 'Livro atualizado com sucesso.' })
  @ApiResponse({ status: 404, description: 'Livro não encontrado.' })
  async update(
    @Param('id') id: string,
    @Body() data: Prisma.BooksUpdateInput,
  ) {
    return await this.booksService.update(id, data);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Deleta um livro pelo ID' })
  @ApiResponse({ status: 200, description: 'Livro deletado com sucesso.' })
  @ApiResponse({ status: 404, description: 'Livro não encontrado.' })
  async remove(@Param('id') id: string) {
    return await this.booksService.remove(id);
  }
}
