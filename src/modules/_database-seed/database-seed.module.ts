import { Module } from "@nestjs/common";
import { DatabaseModule } from "../_database/database.module";
import { InitialSeed } from "./seeders/initial-seed.seed";
import { CommandModule } from 'nestjs-command';
import { ClientModule } from "../client/client.module";

@Module({
    imports: [
        CommandModule,
        DatabaseModule,
        ClientModule,
    ],
    providers: [
        InitialSeed,
        
    ],
    exports: [
        InitialSeed,
        
    ]
})
export class DatabaseSeedModule { }