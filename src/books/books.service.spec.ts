import { writer } from "repl";
import { BooksService } from "./books.service";
import { find } from "rxjs";
import { PrismaService } from "../prisma/prisma.service";
import { Test, TestingModule } from "@nestjs/testing";


const mockPrisma = {
    books: {
        create: jest.fn(),
        findMany: jest.fn(),
        findUnique: jest.fn(),
        update: jest.fn(),
        delete: jest.fn()
    }
}

describe('booksSevice', () => {
    let service: BooksService
    let prisma: PrismaService

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                BooksService,
                { provide: PrismaService, useValue: mockPrisma }
            ]
        }).compile()
        service = module.get<BooksService>(BooksService)
        prisma = module.get<PrismaService>(PrismaService)

    })
    it(' deve criar um livro', async () => {
        const books = {
            name: "o verão que mudou a minha vida",
            writer: "jenny han",
            genre: "romance"
        };
        
        mockPrisma.books.create.mockResolvedValue(books)

        const result = await service.create(books)
        expect(result).toEqual(books);
        expect(mockPrisma.books.create).toHaveBeenCalledWith({ data: books });

    })

    it('deve listar todos os livros', async () => {
        const booksList = [{
            id: "1",
            name: "alice no pais das maravilhas",
            writer: "Libby Hamilton ",
            genre: "fantasia"
        }, {
            id: "2",
            name: "a bela e a fera",
            writer: "Gabrielle-Suzanne",
            genre: "fantasia"
        }
        ]

        mockPrisma.books.findMany.mockResolvedValue(booksList)

        const result = await service.findAll()
        expect(result).toEqual(booksList);
        expect(mockPrisma.books.findMany).toHaveBeenCalledWith()
    })

    it('deve retornar um livro id', async () => {
        const book = {
            id: "1",
            name: "alice no pais das maravilhas",
            writer: "Libby Hamilton ",
            genre: "fantasia"
        }

        mockPrisma.books.findUnique.mockResolvedValue(book)

        const result = await service.findOne("1")
        expect(result).toEqual(book);
        expect(mockPrisma.books.findUnique).toHaveBeenCalledWith({
            where: { id: "1" }
        })

    })

    it('deve atualizar livros por id', async () => {
        const booksUpdate = {
            id: "2",
            name: "a bela e a fera",
            writer: "Gabrielle-Suzanne",
            genre: "fantasia"
        }

        mockPrisma.books.update.mockResolvedValue(booksUpdate)

        const result = await service.update("2", {
            name: "a bela e a fera",
            writer: "Gabrielle-Suzanne",
            genre: "fantasia",
        })
        expect(result).toEqual(booksUpdate)
        expect(mockPrisma.books.update).toHaveBeenCalledWith({
            where: { id: "2" },
            data: {
                name: "a bela e a fera",
                writer: "Gabrielle-Suzanne",
                genre: "fantasia"
            }
        })

    })
    it('deve remover livros por id', async () => {
        const booksdelete = {
            id: "1",
            name: "alice no pais das maravilhas",
            writer: "Libby Hamilton ",
            genre: "fantasia"
        }

        mockPrisma.books.delete.mockResolvedValue(booksdelete)
        const result = await service.remove("1");
        expect(result).toEqual(booksdelete)
        expect(mockPrisma.books.delete).toHaveBeenCalledWith({
            where: { id: "1"}
        })
    })
})
