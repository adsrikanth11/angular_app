import { CommonModule } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import { PokemonService } from '../../core/services/pokemon.service';

@Component({
  selector: 'app-home',
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  page = signal(1);
  pokemons = signal<any[]>([]);
  error = signal('');
  started = signal(false);
  hasNext = signal(true);

  constructor(private pokemonService: PokemonService) {}

  ngOnInit(): void {
    this.start();
  }

  start() {
    this.started.set(true);
    this.fetchData();
  }

  fetchData() {
    this.error.set('');
    this.pokemonService.getPaginatedPokemon(this.page()).subscribe({
      next: (res) => {
        if (res.data.length < 5) this.hasNext.set(false);
        this.pokemonService.getAllDetailsForList(res.data).subscribe({
          next: (details) => this.pokemons.set(details),
          error: (error) => this.error.set( error || 'Error loading Pokemon details')
        });
      },
      error: (error) => this.error.set(error || 'Error loading Pokemon list')
    });
  }

  next() {
    this.page.update(n => n + 1);
    this.fetchData();
  }

  prev() {
    if (this.page() > 1) {
      this.page.update(n => n - 1);
      this.fetchData();
    }
  }
}
