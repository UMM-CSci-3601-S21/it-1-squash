import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { WordList } from '../wordlist';
import { ContextPackService } from '../contextpack.service';

@Component({
  selector: 'app-add-wl',
  templateUrl: './add-wordlist.component.html',
  styleUrls: ['./add-wordlist.component.scss']
})
export class AddWordlistComponent implements OnInit {

  addWordListForm: FormGroup;

  wordList: WordList;

  addWordListValidationMessages = {
    name: [
      {type: 'required', message: 'A name is required'},
      {type: 'maxlength', message: 'The name cannot exceed 50 characters'},
      {type: 'existingName', message: 'This name has already been taken'}
    ],

    enabled: [
      {type: 'required', message: 'You must specify whether the pack is enabled or disabled'},
    ],
  };

  constructor(private fb: FormBuilder, private cpService: ContextPackService,
    private snackBar: MatSnackBar, private router: Router) { }

  createForms() {
    this.addWordListForm = this.fb.group({
      name: new FormControl('', Validators.compose([
        Validators.required,
        Validators.maxLength(50),
      ])),

      enabled: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^(true|false)$'),
      ]))
    });
  }
  ngOnInit(): void {
    this.createForms();
  }

  submitForm() {
    this.cpService.addWordList(this.addWordListForm.value).subscribe(newID => {
      this.snackBar.open('Added the ' + this.addWordListForm.value.name + ' word list successfully', null, {
        duration: 2000,
      });
    }, err => {
      console.log(err);
      });
  }

}
