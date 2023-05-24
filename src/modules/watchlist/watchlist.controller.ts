import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { WatchlistService } from './watchlist.service';
import { WatchListDTO } from './dto';
import { EPrefixes } from '../../common/enums/prefixes.enum';
import { JwtAuthGuard } from '../../guards/jwt-guard';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { createAssetResponse } from './response';

@Controller(EPrefixes.WatchList)
export class WatchlistController {
  constructor(private readonly watchlistService: WatchlistService) {}

  @Get()
  getAssets() {
    return;
  }

  @ApiTags('WATCHLIST')
  @ApiResponse({ status: 201, type: createAssetResponse })
  @UseGuards(JwtAuthGuard)
  @Post()
  createAsset(
    @Body() assetDto: WatchListDTO,
    @Req() request,
  ): Promise<createAssetResponse> {
    const user = request.user;
    return this.watchlistService.createAsset(user, assetDto);
  }

  @Patch()
  updateAsset() {
    return;
  }

  @ApiTags('WATCHLIST')
  @ApiResponse({ status: 200 })
  @UseGuards(JwtAuthGuard)
  @Delete(':assetId')
  deleteAsset(
    @Param('assetId') assetId: string,
    @Req() request,
  ): Promise<boolean> {
    const { id: userId } = request.user;
    return this.watchlistService.deleteAsset(userId, assetId);
  }
}
