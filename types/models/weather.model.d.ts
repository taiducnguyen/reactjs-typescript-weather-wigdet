/* eslint-disable camelcase */
export type IWeatherModel = {
    id: number;
    main: string;
    description: string;
    icon: string;
}

export type ICoordModel = {
    lon: number;
    lat: number;
}

export type IWindModel = {
    speed: number;
    deg: number;
}

export type IWeatherSysInfoModel = {
    type: number;
    id: number;
    message: number;
    country: string;
    sunrise: number;
    sunset: number;
}

/* eslint-disable camelcase */
export type IWeatherMainInfoModel = {
    temp: number;
    pressure: number;
    humidity: number;
    temp_min: number;
    temp_max: number;
}

export type IWeatherConditionModel = {
    coord?: ICoordModel;
    weather?: IWeatherModel[];
    base?: string;
    main?: IWeatherMainInfoModel;
    visibility?: number;
    wind?: IWindModel;
    clouds?: {
        all: string;
    };
    dt?: number;
    sys?: IWeatherSysInfoModel;
    id?: number;
    name?: string;
    cod?: number;
}

/* eslint-disable camelcase */
export type ILocationInfoModel = {
    name?: string;
    local_names?: object;
    lat?: number;
    lon?: number;
    country?: string;
}

/* eslint-disable camelcase */
export type IConcentrationModel = {
    co: number;
    no: number;
    no2: number;
    o3: number;
    so2: number;
    pm2_5: number;
    pm10: number;
    nh3: number;
}

export type IAirPollutionDetailModel = {
    dt?: number;
    main?: {
        aqi: number;
    };
    components?: IConcentrationModel;
}

export type IAirPollutionModel = {
    coord?: number[],
    list?: IAirPollutionDetailModel[];
}

export type ITemperatureModel = {
    day: number;
    min: number;
    max: number;
    night: number;
    eve: number;
    morn: number;
}

/* eslint-disable camelcase */
export type ICurrentAndForcecastDetailModel = {
    dt?: number;
    sunrise?: number;
    sunset?: number;
    moonrise?: number;
    moonset?: number;
    moon_phase?: number;
    feels_like?: ITemperatureModel;
    pressure?: number;
    humidity?: number;
    dew_point?: number;
    wind_speed?: number;
    wind_deg?: number;
    wind_gust?: number;
    weather?: IWeatherModel[];
    clouds?: number;
    pop?: number;
    rain?: number;
    uvi?: number;
}

export type ICurrentAndForcecastItemModel = ICurrentAndForcecastDetailModel & {
    temp?: number;
}

export type IDailyAndForcecastItemModel = ICurrentAndForcecastDetailModel & {
    temp?: ITemperatureModel;
}

export type IMinutelyModel = {
    dt: number;
    precipitation: number;
}

/* eslint-disable camelcase */
export type ICurrentAndForcecastModel = {
    lat?: number;
    lon?: number;
    timezone?: string;
    timezone_offset?: number;
    current?: ICurrentAndForcecastItemModel;
    minutely?: any;
    hourly?: ICurrentAndForcecastDetailModel;
    daily?: IDailyAndForcecastItemModel[];
}