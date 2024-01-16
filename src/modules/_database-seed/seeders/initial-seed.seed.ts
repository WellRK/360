import { Injectable } from "@nestjs/common";
import { Command } from 'nestjs-command';
import { ProfileClientEnum } from "../../../shared/enums/profile-client.enum";
import { ProfileClientModel } from "../../client/models/profile-client.model";
import { ProfileClientRepository } from "../../client/repositories/profile.repository";

@Injectable()
export class InitialSeed {

    constructor(
        private readonly _profileRepository: ProfileClientRepository,
    ) {

    }

    @Command({
        command: 'seed:database',
        describe: 'seed database intial',
    })
    async seed() {

        try {
            console.log('start seed');

            const porteirosProfileClientModel = new ProfileClientModel();
            porteirosProfileClientModel._id = ProfileClientEnum.porteiros;
            porteirosProfileClientModel.name = 'porteiros';
            porteirosProfileClientModel.description = 'Porteiros';

            await this._profileRepository.save(porteirosProfileClientModel);

            const fotografoProfileClientModel = new ProfileClientModel();
            fotografoProfileClientModel._id = ProfileClientEnum.fotografo;
            fotografoProfileClientModel.name = 'fotógrafo';
            fotografoProfileClientModel.description = 'Fotógrafo';

            await this._profileRepository.save(fotografoProfileClientModel);

            const indicacaoProfileClientModel = new ProfileClientModel();
            indicacaoProfileClientModel._id = ProfileClientEnum.indicacao;
            indicacaoProfileClientModel.name = 'indicação';
            indicacaoProfileClientModel.description = 'Indicação';

            await this._profileRepository.save(indicacaoProfileClientModel);

            const proprietarioProfileClientModel = new ProfileClientModel();
            proprietarioProfileClientModel._id = ProfileClientEnum.proprietario;
            proprietarioProfileClientModel.name = 'proprietário';
            proprietarioProfileClientModel.description = 'Proprietário';

            await this._profileRepository.save(proprietarioProfileClientModel);

            const adminProfileClientModel = new ProfileClientModel();
            adminProfileClientModel._id = ProfileClientEnum.admin;
            adminProfileClientModel.name = 'admin';
            adminProfileClientModel.description = 'Admin';

            await this._profileRepository.save(adminProfileClientModel);

            const corretorProfileClientModel = new ProfileClientModel();
            corretorProfileClientModel._id = ProfileClientEnum.corretor;
            corretorProfileClientModel.name = 'corretor';
            corretorProfileClientModel.description = 'Corretor';

            await this._profileRepository.save(corretorProfileClientModel);

            const vistoriadorProfileClientModel = new ProfileClientModel();
            vistoriadorProfileClientModel._id = ProfileClientEnum.vistoriador;
            vistoriadorProfileClientModel.name = 'vistoriador';
            vistoriadorProfileClientModel.description = 'Vistoriador';

            await this._profileRepository.save(vistoriadorProfileClientModel);
            console.log('---------- seed finished');

        } catch (error) {
            console.log(error);
        }
    }
}
