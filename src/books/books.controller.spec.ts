import { Test, TestingModule } from "@nestjs/testing"
import { BooksController } from "./books.controller"
import { BooksService } from "./books.service"
import { writer } from "repl"

describe('BooksController', () => {
    let controller: BooksController
    let booksService: jest.Mocked<BooksService>
    beforeEach(async () => {
        const mockBooksService: jest.Mocked<BooksService> = {
            create: jest.fn(),
            findAll: jest.fn(),
            findOne: jest.fn(),
            update: jest.fn(),
            remove: jest.fn()
        } as any
        const module: TestingModule = await Test.createTestingModule({
            controllers: [
                BooksController
            ],
            providers: [
                { provide: BooksService, useValue: mockBooksService }
            ]
        }).compile()
        controller = module.get<BooksController>(BooksController)
        booksService = module.get(BooksService)
    })

    it('deve criar criar books,', async () => {
        const CreateBooks = {
            id: "1",
            name: "o verão que mudou a minha vida",
            writer: "jenny han",
            genre: "romance"
        };

        booksService.create.mockResolvedValue(CreateBooks)

        const result = await controller.create(CreateBooks)
        expect(result).toEqual(CreateBooks)
        expect(booksService.create).toHaveBeenCalledWith(CreateBooks)
    })

    it('deve listar todos os livros', async () => {
        const booksList = [{
            id: "1",
            name: "alice no país das maravilhas",
            writer: "Libby Hamilton",
            genre: "fantasia"
        }, {
            id: "2",
            name: " a bela e a fera",
            writer: "Gabrielle-Suzanne",
            genre: "fantasia"
        }
        ]

        booksService.findAll.mockResolvedValue(booksList)

        const result = await controller.findAll()
        expect(result).toEqual(booksList)
        expect(booksService.findAll).toHaveBeenCalledWith()
    })

    it('deve retornar um livro por id', async () => {
        const books = {
            id: "1",
            name: "alice no pais das maravilhas",
            writer: "Libby Hamilton",
            genre: "fanatasia"
        };

        booksService.findOne.mockResolvedValue(books)

        const result = await controller.findOne("1")
        expect(result).toEqual(books)
        expect(booksService.findOne).toHaveBeenCalledWith("1")
    })

    it('deve atualizar livros por id', async () => {
        const booksUpdate = {
            id: "2",
            name: "a bela e a fera",
            writer: "Gabrielle-Suzanne",
            genre: "fantasia"
        };

        booksService.update.mockResolvedValue(booksUpdate)

        const result = await controller.update(booksUpdate.id, booksUpdate)
        
    })

    it('deve remover livros por id', async () => {
        const booksdelete = {
            id: "2",
            name: "alice no país das maravilhas",
            writer: "Libby Hamilton",
            genre: "fantasia"
        };

        booksService.remove.mockResolvedValue(booksdelete)

        const result = await controller.remove("2")
        expect(result).toEqual(booksdelete)
        expect(booksService.remove).toHaveBeenCalledWith("2")
    })
})


