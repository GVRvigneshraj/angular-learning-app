import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExamService } from '../../core/services/exam-service';


@Component({
  selector: 'app-onboarding',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './onboarding.html',
  styleUrls: ['./onboarding.scss'],
})
export class Onboarding implements OnInit {

  exams: any[] = [];

  constructor(private examService: ExamService) {}

  ngOnInit(): void {
    this.examService.getExams()
      .subscribe(res => {
        this.exams = res;
      });
  }
}
