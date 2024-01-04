import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-testimonials',
  templateUrl: './testimonials.page.html',
  styleUrls: ['./testimonials.page.scss'],
})
export class TestimonialsPage implements OnInit {

  testimonials = [
    { name: 'User 1', image: '/assets/avatars/av-1.png', description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.'},
    { name: 'User 2', image: '/assets/avatars/av-2.png', description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.'},
    { name: 'User 3', image: '/assets/avatars/av-3.png', description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.'},
    { name: 'User 4', image: '/assets/avatars/av-4.png', description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.'},
    { name: 'User 5', image: '/assets/avatars/av-5.png', description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.'},
  ]
  c5nstructor() { }

  ngOnInit() {
  }

}
