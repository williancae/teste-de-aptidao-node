import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
    constructor(private configService: ConfigService) {}

    createTypeOrmOptions(): TypeOrmModuleOptions {
        console.log(
            `url ${this.configService.get('database.url', { infer: true })}`,
        );
        return {
            type: this.configService.get('database.type', { infer: true }),
            url: this.configService.get('database.url', { infer: true }),
            host: this.configService.get('database.host', { infer: true }),
            port: this.configService.get('database.port', { infer: true }),
            username: this.configService.get('database.username', {
                infer: true,
            }),
            password: this.configService.get('database.password', {
                infer: true,
            }),
            database: this.configService.get('database.name', { infer: true }),
            synchronize: this.configService.get('database.synchronize', {
                infer: true,
            }),
            dropSchema: false,
            keepConnectionAlive: true,
            logging:
                this.configService.get('app.nodeEnv', { infer: true }) !==
                'production',
            entities: [__dirname + '/../modules/**/**/*.entity{.ts,.js}'],
            migrations: [__dirname + '/migrations/**/*{.ts,.js}'],
            cli: {
                entitiesDir: 'src',
                subscribersDir: 'subscriber',
            },
        } as TypeOrmModuleOptions;
    }
}
