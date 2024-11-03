import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-authors',
  templateUrl: './authors.component.html',
  styleUrls: ['./authors.component.css'],
  standalone: true,
  imports: [NgIf]
})
export class AuthorsComponent implements OnInit {
  author: any = null;
  notFound: boolean = false; // Flag to track 404 error

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = params['id'];
      if (id) {
        this.fetchAuthor(id);
      }
    });
  }

  fetchAuthor(authorId: string): void {
    this.notFound = false; // Reset the not found flag
    if (authorId) {
      this.http.get(`http://localhost:8080/books-api/authors/${authorId}`).subscribe(
        (data: any) => {
          this.author = data;
          this.notFound = false;
          this.router.navigate(['/authors', authorId]);
        },
        (error) => {
          if (error.status === 404) {
            console.warn('Author not found:', error);
            this.notFound = true; // Set the not found flag if 404
            this.author = null;
          } else {
            console.error('Failed to fetch author:', error);
          }
        }
      );
    }
  }
}
