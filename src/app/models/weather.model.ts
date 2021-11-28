export interface IWeatherModel {
    id: number;
    main: string;
    description: string;
    icon: string;
}

export interface ICoordModel {
    lon: number;
    lat: number;
}

export interface IWindModel {
    speed: number;
    deg: number;
}

export interface IWeatherSysInfoModel {
    type: number;
    id: number;
    message: number;
    country: string;
    sunrise: number;
    sunset: number;
}

export interface IWeatherMainInfoModel {
    temp: number;
    pressure: number;
    humidity: number;
    temp_min: number;
    temp_max: number;
}

export interface IWeatherConditionModel {
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

export interface ILocationInfoModel {
    name?: string;
    local_names?: object;
    lat?: number;
    lon?: number;
    country?: string;
}

export interface IConcentrationModel {
    co: number;
    no: number;
    no2: number;
    o3: number;
    so2: number;
    pm2_5: number;
    pm10: number;
    nh3: number;
}

export interface IAirPollutionDetailModel {
    dt?: number;
    main?: object;
    components?: IConcentrationModel;
}

export interface IAirPollutionModel {
    coord: number[],
    list: IAirPollutionDetailModel[];
}

export interface ITemperatureModel {
    day: number;
    min: number;
    max: number;
    night: number;
    eve: number;
    morn: number;
}

export interface ICurrentAndForcecastDetailModel {
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

export interface ICurrentAndForcecastItemModel extends ICurrentAndForcecastDetailModel {
    temp?: number;
}

export interface IDailyAndForcecastItemModel extends ICurrentAndForcecastDetailModel {
    temp?: ITemperatureModel;
}

export interface IMinutelyModel {
    dt: number;
    precipitation: number;
}

export interface ICurrentAndForcecastModel {
    lat?: number;
    lon?: number;
    timezone?: string;
    timezone_offset?: number;
    current?: ICurrentAndForcecastItemModel;
    minutely?: any;
    hourly?: ICurrentAndForcecastDetailModel;
    daily?: IDailyAndForcecastItemModel[];
}

export enum WeatherUnits {
    Standard = 'standard',
    Imperial = 'imperial',
    Metric = 'metric',
}
