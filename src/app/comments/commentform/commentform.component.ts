import { Component, EventEmitter, OnInit, Output, AfterViewInit } from '@angular/core';
import { api2Service } from '../../services/api2.service';
import { Input } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { authService } from "../../services/authService.service";

@Component({
  selector: 'app-commentform',
  templateUrl: './commentform.component.html',
  styleUrls: ['./commentform.component.scss']
})
export class CommentformComponent implements OnInit {

  constructor(private api2Service: api2Service, private router: Router,
    private route: ActivatedRoute, private auth: authService,) { }
  body
  @Input() comment: any
  @Input() filmId: number
  @Input() parentId: any
  @Output() commentPosted = new EventEmitter<any>();
  public isEmojiPickerVisible: boolean;
  public textArea: string = '';
  user: any

  i18n = {
    search: 'Поиск',
    clear: 'Очистить',
    notfound: 'Не найдено',
    categories: {
      search: 'Результаты поиска',
      recent: 'Недавно использованные',
      smileys: 'Смайлики и эмоции',
      people: 'Люди и животные',
      nature: 'Еда, природа и путешествия',
      foods: 'Еда и напитки',
      activity: 'Спорт и активный отдых',
      places: 'Путешествия и места',
      objects: 'Предметы',
      symbols: 'Символы',
      flags: 'Флаги',
      custom: 'Кастомные эмодзи',
    },
    categorieslabel: 'Категории эмодзи',
  };


 ngOnInit() {
  if (this.auth.user$ && this.auth.user$.subscribe) {
    this.auth.user$.subscribe(x => {
      this.user = x;
      if (this.comment && this.comment.user) {
        this.textArea = this.comment.user.name + ", ";
      }
    });
  }
}

  postOnBtn() {
    if (!this.textArea) {
      return
    }
    this.api2Service.postComment(this.filmId, this.textArea, this.parentId).subscribe((data) => {
      this.comment = data.data
      this.textArea = ""
      this.commentPosted.emit(this.comment)
    })
  }

  public addEmoji(event) {
    this.textArea = `${this.textArea}${event.emoji.native}`;
    this.isEmojiPickerVisible = false;
  }
}
