// endpoint.controller.ts

import { Controller, Get, Query, HttpException, HttpStatus } from '@nestjs/common';

@Controller('api')
export class TaskController {
  @Get()
  getEndpointData(@Query('slack_name') slackName: string, @Query('track') track: string) {
    // Get the current day of the week
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const currentDay = daysOfWeek[new Date().getDay()];

    // Get the current UTC time accurate within a +/-2 minute window
    const now = new Date();
    const utcTime = new Date(now.getTime() - (now.getTimezoneOffset() * 60000)).toISOString();

    // Construct the response JSON
    const response = {
      slack_name: slackName,
      current_day: currentDay,
      utc_time: utcTime,
      track: track,
      github_file_url: 'https://github.com/ifeanyiokala/HNG/blob/main/Task1/src/main.ts',
      github_repo_url: 'https://github.com/ifeanyiokala/HNG',
      status_code: 200,
    };

    return response;
  }
}
