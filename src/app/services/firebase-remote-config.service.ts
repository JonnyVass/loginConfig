import { Injectable } from '@angular/core';
import { AngularFireRemoteConfig } from '@angular/fire/compat/remote-config';

@Injectable({
  providedIn: 'root'
})
export class FirebaseRemoteConfigService {

 
  constructor(
    private remoteConfig: AngularFireRemoteConfig
  ) { }

  //Get remote config value by key
  public async getusuariosByKey(key: string): Promise<any> {
    return this.remoteConfig.getNumber(key).then((value: number) => {
      console.log(`getusuariosByKey RemoteConfig -> ${key}`);
      console.log(value);
      return value;
    }).catch((err) => {
      console.log(`getusuariosByKey Error RemoteConfig -> ${key}`);
      console.log(err);
      return err;
    });
  }

  public getNumeroConfig(key: string){
    return this.remoteConfig.fetchAndActivate().then((val:boolean) =>{
      let valor = this.remoteConfig.getNumber(key);
      console.log(`getNumeroConfig RemoteConfig -> ${key}`);
      console.log(valor);
      return valor;
    }).catch((err) =>{
      console.log(`getNumeroConfig Error RemoteConfig -> ${key}`);
      console.log(err);
    })
  }

  public getCadenaConfig(key: string){
    return this.remoteConfig.fetchAndActivate().then((val:boolean) =>{
      let valor = this.remoteConfig.getString(key);
      console.log(`getCadenaConfig RemoteConfig -> ${key}`);
      console.log(valor);
      return valor;
    }).catch((err) =>{
      console.log(`getCadenaConfig Error RemoteConfig -> ${key}`);
      console.log(err);
    })
  }

  public async getNumberByKey(key: string): Promise<number> {
    return this.remoteConfig.getNumber(key).then((value: number) => {
      console.log(`getNumberByKey RemoteConfig -> ${key}`);
      console.log(value);
      return value;
    }).catch((err) => {
      console.log(`getNumberByKey Error RemoteConfig -> ${key}`);
      console.log(err);
      return err;
    });
  }

  public async getStringByKey(key: string): Promise<string> {
    return this.remoteConfig.getString(key).then((value: string) => {
      console.log(`getStringByKey RemoteConfig -> ${key}`);
      console.log(value);
      return value;
    }).catch((err) => {
      console.log(`getStringByKey Error RemoteConfig -> ${key}`);
      console.log(err);
      return err;
    });
  }

}
