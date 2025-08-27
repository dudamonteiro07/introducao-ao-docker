import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsString } from "class-validator"

export class CreateBooksDTO {
    @ApiProperty({example: 'para todos os garotos que já amei'})
    @IsNotEmpty()
    @IsString()
    name: string

    @ApiProperty({example: 'Jenny Han'})
    @IsNotEmpty()
    @IsString()
    writer: string

    @ApiProperty({example: 'romance'})
    @IsNotEmpty()
    @IsString()
    genre:  string
}