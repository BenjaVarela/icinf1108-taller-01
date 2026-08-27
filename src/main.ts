import { AppModule } from "@/app.module";
import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { ResponseInterceptor } from "./common/interceptors/response.interceptor";
import { AllExceptionsFilter } from "./common/filters/http-exception.filter";

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    app.enableCors({
        origin: "*",
    });

    // Global Interceptor and Exception Filter for API response standardization
    app.useGlobalInterceptors(new ResponseInterceptor());
    app.useGlobalFilters(new AllExceptionsFilter());

    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true,
            forbidNonWhitelisted: true,
            transform: true,
        }),
    );

    const config = new DocumentBuilder()
        .setTitle("NestJS CRUD Students & Pets")
        .setDescription(
            "In-memory CRUD API for Student entity and their Pets",
        )
        .setVersion("1.0")
        .build();

    const document = SwaggerModule.createDocument(app, config);

    SwaggerModule.setup("docs", app, document);

    await app.listen(3000, "0.0.0.0");

    console.log("Application running on: http://localhost:3000");
    console.log("Documentation at: http://localhost:3000/docs");
}

bootstrap();