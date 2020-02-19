import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'app-setting',
    templateUrl: 'setting.page.html',
    styleUrls: ['setting.page.scss']
})
export class SettingPage implements OnInit {

    ngOnInit() {
    }

    // add back when alpha.4 is out
    // navigate(item) {
    //   this.router.navigate(['/list', JSON.stringify(item)]);
    // }
}
