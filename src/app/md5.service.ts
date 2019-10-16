import { Injectable } from '@angular/core';
import { Md5 } from 'ts-md5';

@Injectable({
  providedIn: 'root'
})
export class Md5Service {

  constructor(private MD5: Md5) { }

  toMD5(param: any){
    const md5 = new Md5();
    return md5.appendStr(param).end();
  }
}
