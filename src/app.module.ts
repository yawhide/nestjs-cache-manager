import { Module } from "@nestjs/common";
import { TestController } from "./test/test.controller.js";
import { CacheModule } from "@nestjs/cache-manager";
import Keyv from "keyv";
import KeyvRedis from "@keyv/redis";

@Module({
  imports: [
    CacheModule.registerAsync({
      isGlobal: true,
      useFactory: async () => {
        return {
          stores: [
            new Keyv({
              store: new KeyvRedis({
                socket: {
                  host: "localhost",
                  port: 6379,
                },
              }),
              // namespace: "nest",
              // ttl: 60 * 1000 * 10,
            }),
          ],
          namespace: "nest",
          ttl: 60 * 1000 * 10,
        };
      },
    }),
  ],
  controllers: [TestController],
})
export class AppModule {}
