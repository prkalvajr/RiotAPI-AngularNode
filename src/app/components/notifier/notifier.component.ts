import {  Component } from "@angular/core";
import { ToastrService } from "ngx-toastr";

@Component({
    selector: "app-notifier",
    templateUrl: "./notifier.component.html",
    imports: [],
    standalone: true,
})

export class NotifierComponent {
    constructor(private toast:ToastrService) { }

    showSuccessMessage(message: string) {
        this.toast.success(message);
    }
}