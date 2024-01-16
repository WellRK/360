import { SetMetadata } from "@nestjs/common";
import { ProfileBackofficeEnum } from "../enums/profile-backoffice.enum";

export const ProfilesBackoffice = (...functions: ProfileBackofficeEnum[]) => SetMetadata('profiles-backoffice', functions);