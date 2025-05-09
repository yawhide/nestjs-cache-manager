import { CACHE_MANAGER } from "@nestjs/cache-manager";
import { Controller, Get, Inject } from "@nestjs/common";
import type { Cache } from "cache-manager";
import { Logger } from "@nestjs/common";

@Controller("test")
export class TestController {
  private readonly logger = new Logger(TestController.name, {
    timestamp: true,
  });

  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  @Get()
  async getHello(): Promise<string> {
    const value = (await this.cacheManager.get("test-keyv")) as string;
    if (value) {
      return value;
    }
    // Simulate slow query
    await new Promise((resolve) => setTimeout(resolve, 5000));
    await this.cacheManager.set("test-keyv", "Hello World!");
    return "Hello World!";
  }
}
