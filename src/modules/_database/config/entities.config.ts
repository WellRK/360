
import { PlaceModel } from "../../client/models/place.model";
import { ProfessionModel } from "../../client/models/profession.model";
import { ProfileClientModel } from "../../client/models/profile-client.model";

import { RequestProfileClientModel } from "../../client/models/request-profile.model";
import { UserClientModel } from "../../client/models/user-client.model";
import { VerificationModel } from "../../client/models/verification.model";


export const entitiesConfig = [
    UserClientModel,
    VerificationModel,
    ProfileClientModel,
    RequestProfileClientModel,
    PlaceModel,
    ProfessionModel,
];