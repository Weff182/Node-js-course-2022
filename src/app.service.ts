import { Injectable } from '@nestjs/common';
import { RolesService } from './roles/roles.service';
import { VinylService } from './vinyls/vinyl.service';

@Injectable()
export class AppService {
  constructor(
    private vinylsService: VinylService,
    private roleService: RolesService,
  ) {}

  async getStartFunction(): Promise<void> {
    await this.vinylsService.createStartVinyls();
    await this.roleService.createStartRole();
  }
}
