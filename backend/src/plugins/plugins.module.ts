import { Module, forwardRef, OnModuleInit } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { ScreenDesignerModule } from '../screen-designer/screen-designer.module';
import { PluginsService } from './plugins.service';
import { PluginRendererService } from './plugin-renderer.service';
import { OAuthService } from './oauth/oauth.service';
import { PluginsController } from './plugins.controller';

@Module({
  imports: [PrismaModule, forwardRef(() => ScreenDesignerModule)],
  controllers: [PluginsController],
  providers: [PluginsService, PluginRendererService, OAuthService],
  exports: [PluginsService, PluginRendererService, OAuthService],
})
export class PluginsModule implements OnModuleInit {
  constructor(private readonly pluginsService: PluginsService) {}

  async onModuleInit() {
    try {
      await this.pluginsService.cleanupStalePlugins();
      await this.pluginsService.seedBuiltinPlugins();
    } catch {
      // Non-critical — skip if DB not ready
    }
  }
}
