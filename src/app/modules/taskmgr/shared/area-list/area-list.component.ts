import { Subscription } from 'rxjs/Subscription';
import { Subject, Observable } from 'rxjs';
import { Address } from './../../domain/user.model';
import { Component, OnInit, forwardRef, OnDestroy } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, NG_VALIDATORS, FormControl } from '@angular/forms';
import { getProvinces, getCitiesByProvince, getAreaByCity } from '../../util/area.util';

@Component({
  selector: 'app-area-list',
  templateUrl: './area-list.component.html',
  styleUrls: ['./area-list.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AreaListComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => AreaListComponent),
      multi: true,
    }
  ],
})
export class AreaListComponent implements OnInit, OnDestroy, ControlValueAccessor {

  _address: Address = {
    province: '',
    city: '',
    district: '',
    street: ''
  };

  _province = new Subject();
  _city = new Subject();
  _district = new Subject();
  _street = new Subject();

  province$: Observable<any>;
  city$: Observable<any>;
  district$: Observable<any>;

  private sub: Subscription;

  private propagateChange = (_: any) => { };
  constructor() { }

  ngOnInit() {
    const province$ = this._province.asObservable().startWith('');
    const city$ = this._city.asObservable().startWith('');
    const district$ = this._district.asObservable().startWith('');
    const street$ = this._street.asObservable().startWith('');
    const val$ = Observable.combineLatest([province$, city$, district$, street$], (_p, _c, _d, _s) => {
      return {
        province: _p,
        city: _c,
        district: _d,
        street: _s
      };
    });

    this.sub = val$.subscribe(v => {
      this.propagateChange(v);
    });

    this.province$ = Observable.of(getProvinces());
    this.city$ = province$.map(p => getCitiesByProvince(p));
    this.district$ = Observable.combineLatest(province$, city$, (p, c) => getAreaByCity(p, c));

  }

  // 写入控件值
  public writeValue(obj: Address) {
    if (obj) {
      this._address = obj;
    }
    if (this._address.province) {
      this._province.next(this._address.province);
    }
    if (this._address.city) {
      this._city.next(this._address.city);
    }
    if (this._address.district) {
      this._district.next(this._address.district);
    }
    if (this._address.street) {
      this._street.next(this._address.street);
    }
  }


  // 当表单控件值改变时，函数 fn 会被调用
  // 这也是我们把变化 emit 回表单的机制
  public registerOnChange(fn: any) {
    this.propagateChange = fn;
  }

  // 这里没有使用，用于注册 touched 状态
  public registerOnTouched() {
  }

  validate(c: FormControl): { [key: string]: any } {
    const val = c.value;
    if (!val) {
      return null;
    }
    if (val.province && val.city && val.district && val.street && val.street.length >= 4) {
      return null;
    }
    return {
      addressNotValid: true
    };
  }

  onProvinceChange() {
    this._province.next(this._address.province);
  }

  onCityChange() {
    this._city.next(this._address.city);
  }

  onDistrictChange() {
    this._district.next(this._address.district);
  }

  onStreetChange() {
    this._street.next(this._address.street);
  }

  ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

}
