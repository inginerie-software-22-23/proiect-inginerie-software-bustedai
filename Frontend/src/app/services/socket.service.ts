import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root'
})

export class SocketService {
	// constructor(private socket: Socket) { }

  // emit event
	fetchMovies() {
		// this.socket.emit('fetchMovies');
	} 

	// listen event
	onFetchMovies() {
		// return this.socket.fromEvent('fetchMovies');
	}
}