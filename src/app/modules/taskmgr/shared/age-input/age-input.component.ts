import { Observable } from 'rxjs/Observable';
import { Component, OnInit, forwardRef, OnDestroy, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR, NG_VALIDATORS, FormGroup, FormBuilder, FormControl, ControlValueAccessor } from '@angular/forms';
import {
  subYears,
  subMonths,
  subDays,
  isBefore,
  differenceInDays,
  differenceInMonths,
  differenceInYears,
} from 'date-fns';
import { isValidDate, toDate } from '../../util/date.util';
import { Subscription } from 'rxjs/Subscription';

export enum AgeUnit {
  Year = 0,
  Month,
  Day
}

export interface Age {
  age: number;
  unit: AgeUnit;
}

@Component({
  selector: 'app-age-input',
  templateUrl: './age-input.component.html',
  styleUrls: ['./age-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AgeInputComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => AgeInputComponent),
      multi: true,
    }
  ],
})
export class AgeInputComponent implements ControlValueAccessor, OnInit , OnDestroy{
  @Input() daysTop = 90;
  @Input() daysBottom = 0;
  @Input() monthsTop = 24;
  @Input() monthsBottom = 1;
  @Input() yearsBottom = 1;
  @Input() yearsTop = 150;
  @Input() debounceTime = 300;
  // @Input() format = 'yyyy-MM-dd';
  form: FormGroup;
  ageUnits = [
    { value: AgeUnit.Year, label: '岁' },
    { value: AgeUnit.Month, label: '月' },
    { value: AgeUnit.Day, label: '天' }
  ];
  dateOfBirth;
  selectedUnit = AgeUnit.Year;
  sub: Subscription;
  private propagateChange = (_: any) => { };

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    const initDate = this.dateOfBirth ? this.dateOfBirth : toDate(subYears(Date.now(), 30));
    const initAge = this.toAge(initDate);
    this.form = this.fb.group({
      birthday: [initDate],
      age: this.fb.group({
        ageNum: [initAge.age],
        ageUnit: [initAge.unit]
      }, { validator: this.validateAge('ageNum', 'ageUnit') })
    });
    const birthday = this.form.get('birthday');
    const ageNum = this.form.get('age').get('ageNum');
    const ageUnit = this.form.get('age').get('ageUnit');

    const birthday$ = birthday.valueChanges
      .map(d => {
        return { date: d, from: 'birthday' };
      })
      .debounceTime(this.debounceTime)
      .distinctUntilChanged()
      .filter(_ => birthday.valid);
    const ageNum$ = ageNum.valueChanges
      .startWith(ageNum.value)
      .debounceTime(this.debounceTime)
      .distinctUntilChanged();
    const ageUnit$ = ageUnit.valueChanges
      .startWith(ageUnit.value)
      .debounceTime(this.debounceTime)
      .distinctUntilChanged(); // 设置初始值
    const age$ = Observable
      .combineLatest(ageNum$, ageUnit$, (_n, _u) => {
        return this.toDate({ age: _n, unit: _u });
      })
      .map(d => {
        return { date: d, from: 'age' };
      })
      .filter(_ => this.form.get('age').valid);

    const merged$ = Observable.merge(birthday$, age$).filter(_ => this.form.valid);
    this.sub = merged$.subscribe(d => {
      const age = this.toAge(d.date);
      if (d.from === 'birthday') {
        if (age.age !== ageNum.value) {
          ageNum.patchValue(age.age, { emitEvent: false });
        }
        if (age.unit !== ageUnit.value) {
          this.selectedUnit = age.unit;
          ageUnit.patchValue(age.unit, { emitEvent: false });
        }
        this.propagateChange(d.date);
      } else {
        const ageToCompare = this.toAge(birthday.value);
        if (age.age !== ageToCompare.age || age.unit !== ageToCompare.unit) {
          birthday.patchValue(d.date, { emitEvent: false });
          this.propagateChange(d.date);
        }
      }
    });
  }

  validate(c: FormControl): { [key: string]: any } {
    const val = c.value;
    if (!val) {
      return null;
    }
    if (isValidDate(val)) {
      return null;
    }
    return {
      ageInvalid: true
    };
  }

  validateDate(c: FormControl): { [key: string]: any } {
    const val = c.value;
    return isValidDate(val) ? null : {
      birthdayInvalid: true
    };
  }

  validateAge(ageNumKey: string, ageUnitKey: string) {
    return (group: FormGroup): { [key: string]: any } => {
      const ageNum = group.controls[ageNumKey];
      const ageUnit = group.controls[ageUnitKey];
      let result = false;
      const ageNumVal = ageNum.value;

      switch (ageUnit.value) {
        case AgeUnit.Year: {
          result = ageNumVal >= this.yearsBottom && ageNumVal <= this.yearsTop;
          break;
        }
        case AgeUnit.Month: {
          result = ageNumVal >= this.monthsBottom && ageNumVal <= this.monthsTop;
          break;
        }
        case AgeUnit.Day: {
          result = ageNumVal >= this.daysBottom && ageNumVal <= this.daysTop;
          break;
        }
        default: {
          result = false;
          break;
        }
      }
      return result ? null : {
        ageInvalid: true
      };
    };
  }

  // 写入控件值
  public writeValue(obj: any) {
    if (obj) {
      const date = toDate(obj);
      this.form.get('birthday').patchValue(date, {emitEvent: true});
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

  toAge(dateStr: string): Age {
    const date = Date.parse(dateStr);
    const now = Date.now();
    return isBefore(subDays(now, this.daysTop), date) ?
      { age: differenceInDays(now, date), unit: AgeUnit.Day } :
      isBefore(subMonths(now, this.monthsTop), date) ?
        { age: differenceInMonths(now, date), unit: AgeUnit.Month } :
        {
          age: differenceInYears(now, date),
          unit: AgeUnit.Year
        };
  }

  private toDate(age: Age): string {
    const now = new Date();
    switch (age.unit) {
      case AgeUnit.Year: {
        return toDate(subYears(now, age.age));
      }
      case AgeUnit.Month: {
        return toDate(subMonths(now, age.age));
      }
      case AgeUnit.Day: {
        return toDate(subDays(now, age.age));
      }
      default: {
        return this.dateOfBirth;
      }
    }
  }

  ngOnDestroy(){
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

}
