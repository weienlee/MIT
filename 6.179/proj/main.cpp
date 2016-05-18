//
//  main.cpp
//  Set
//
//  Created by Wei-En Lee on 1/24/16.
//  Copyright © 2016 weiwei. All rights reserved.
//


//Using SDL and standard IO
#include <iostream>
#include <SDL2/SDL.h>
#include <SDL2/SDL_image.h>
#include <SDL2/SDL_ttf.h>
#include <string>
#include <vector>
#include <map>
#include <random>
#include <ctime>


using namespace std;

//Screen dimension constants
const int SCREEN_WIDTH = 820;
const int SCREEN_HEIGHT = 600;
const int CARD_WIDTH = 180;
const int CARD_HEIGHT = 120;
const int GAP = 20;
const int MASK0 = 85; //0b01010101
const int MASK1 = 170; //0b10101010

map<int, string> COLOR_MAP = {{0, "green"}, {1, "purple"}, {2, "red"}};
map<int, string> SHAPE_MAP = {{0, "diamond"}, {1, "round"}, {2, "squiggle"}};
map<int, string> SHADING_MAP = {{0, "empty"}, {1, "filled"}, {2, "stripe"}};

int myrandom (int i) { return rand()%i;}

class Card {
    
private:
    int number;
    int color;
    int shape;
    int shading;
    int bits;
    int position;

    
public:
    Card(int input_number, int input_color, int input_shape, int input_shading) {
        number = input_number;
        color = input_color;
        shape = input_shape;
        shading = input_shading;
        bits = (number << 6) + (color << 4) + (shape << 2) + (shading);
        
        
        
    }
    
    int get_number() { return number; }
    int get_color() { return color; }
    int get_shape() { return shape; }
    int get_shading() { return shading; }
    int get_bits() { return bits; }
    void set_position(int pos) { position = pos; }
    string to_string() { return std::to_string(number) + " " +
                            std::to_string(color) + " " +
                            std::to_string(shape) + " " +
                            std::to_string(shading); }
    
    void draw_image(SDL_Renderer *renderer) {
        /*
        SDL_Surface * image = IMG_Load("images/green_squiggle_empty.png");
        SDL_Texture * texture = SDL_CreateTextureFromSurface(renderer, image);
         */
        int w=0,h=0;
        int x, y, i;
        int distance = 50;
        int offset = (CARD_WIDTH - ((number+1) * 50) + 5)/2;
        string image_string = "images/" +
                            COLOR_MAP[color] + "_" +
                            SHAPE_MAP[shape] + "_" +
                            SHADING_MAP[shading] + ".png";
        
        x = GAP + (GAP + CARD_WIDTH) * (position/3);
        y = GAP + (GAP + CARD_HEIGHT) * (position%3);
        
        for (i=0; i<=number; i++) {
            SDL_Rect rect;
            SDL_Texture * texture = IMG_LoadTexture(renderer, image_string.c_str());
            SDL_QueryTexture(texture, NULL, NULL, &w, &h);
        
            rect.x = x + distance * i + offset;
            rect.y = y + 15;
            rect.w = 45;
            rect.h = 90;
            SDL_RenderCopy(renderer, texture, NULL, &rect);
        }
    }
};


class Deck {
    
private:
    vector<Card> cards;
    
public:
    Deck() {
        int a, b, c, d;
        for (a=0; a<=2; a++) {
            for (b=0; b<=2; b++) {
                for (c=0; c<=2; c++) {
                    for (d=0; d<=2; d++) {
                        Card *card = new Card(a, b, c, d);
                        cards.push_back(*card);
                    }
                }
            }
        }
        srand((int) time(0));
        random_shuffle(cards.begin(), cards.end(), myrandom);
    }
    
    vector<Card> get_cards() {
        return cards;
    }
    
    void erase_cards(int num_cards) {
        cards.erase(cards.begin(), cards.begin() + num_cards);
    }

};

class Game {
    
private:
    Deck *deck;
    int deckSize;
    int score;
    int score_delta;
    vector<Card> current_cards;
    int selected_positions [3];
    int i;
    SDL_Renderer *renderer;
    clock_t start;
    bool over;
    
public:
    Game() {
    }

    void start_game(SDL_Renderer *r) {
        score = 0;
        score_delta = 0;
        deck = new Deck();
        renderer = r;
        deckSize = (int) deck->get_cards().size();
        current_cards.clear();
        clear_selected_positions();
        for (i=0; i<12; i++) {
            current_cards.push_back(deck->get_cards().at(i));
            current_cards.at(i).set_position(i);
        }
        deck->erase_cards(12);
        draw();
        start = clock();
        over = false;
    }
    
    vector<Card> get_current_cards() {
        return current_cards;
    }
    
    vector<Card> get_deck_cards() {
        return deck->get_cards();
    }
    
    bool is_game_over() {
        return over;
    }
    
    void clear_selected_positions() {
        for (i=0; i<3; i++) {
            selected_positions[i] = -1;
        }
    }
    
    int * get_selected_positions() {
        return selected_positions;
    }
    
    Card * get_card_at_position(int position) {
        if (position < current_cards.size() && position >= 0) {
            return &current_cards.at(position);
        } else {
            return nullptr;
        }
    }
    
    void toggle_card (int position) {
        if (position >= current_cards.size() || position < 0) {
            return;
        } else {
            int num_empty = 0;
            int location = -1;
            int i;
            bool found = false;
            
            // look for value
            for (i=0; i<3; i++) {
                if (selected_positions[i] < 0) {
                    num_empty++;
                    if (location < 0) {
                        location = i;
                    }
                } else if (selected_positions[i] == position) {
                    found = true;
                    location = i;
                }
            }
            
            // add or remove
            if (found) {
                //cout << "REMOVED: " << position << "\n";
                selected_positions[location] = -1;
                num_empty++;
            } else if (location >= 0) {
                //cout << "ADDED: " << position << "\n";
                selected_positions[location] = position;
                num_empty--;
            }
        
            draw();
            
            // check set
            if (num_empty == 0) {
                if (check_set()) {
                    // correct set
                    deal_new_set();
                } else {
                    // incorrect set
                    for (i=0; i<3; i++) {
                        selected_positions[i] = -1;
                    }
                    update_score(false);
                    draw();
                }
            }
        }
    }
    
    bool check_set() {
        Card card1 = current_cards.at(selected_positions[0]);
        Card card2 = current_cards.at(selected_positions[1]);
        Card card3 = current_cards.at(selected_positions[2]);
        
        bool number = ((card1.get_number() + card2.get_number() + card3.get_number()) % 3) == 0;
        bool color = ((card1. get_color() + card2.get_color() + card3.get_color()) % 3) == 0;
        bool shape = ((card1.get_shape() + card2.get_shape() + card3.get_shape()) % 3) == 0;
        bool shading = ((card1.get_shading() + card2.get_shading() + card3.get_shading()) % 3) == 0;
        
        return (number && color && shape && shading);
    }
    
    void deal_new_set() {
        int i;
        
        // cards left to deal
        if (get_deck_cards().size() >= 3) {
            for (i=0; i<3; i++) {
                current_cards[selected_positions[i]] = get_deck_cards().at(i);
                current_cards[selected_positions[i]].set_position(selected_positions[i]);
            }
            deck->erase_cards(3);
            
            while (no_set() and get_deck_cards().size() > 0) {
                cout << "no set, so replacing a card" << "\n";
                int pos = rand() % 3;
                current_cards[selected_positions[pos]] = get_deck_cards().at(0);
                current_cards[selected_positions[pos]].set_position(selected_positions[pos]);
                deck->erase_cards(1);
            }
            
            clear_selected_positions();
            update_score(true);
            draw();
            
            if (no_set() and get_deck_cards().size() == 0) {
                game_over();
            }
        } else {
            game_over();
        }
    }
    
    void update_score(bool increase) {
        double duration;
        duration = ( std::clock() - start ) / (double) CLOCKS_PER_SEC;
        duration = 600 * exp(-0.69 * duration);
        duration = increase ? duration : -1 * duration;
        score += (int) duration;
        score_delta = (int) duration;
        start = clock();
    }
    
    void draw_card_backgrounds() {
        
        int i, x, y;
        for (i=0; i<current_cards.size(); i++) {
            x = GAP + (GAP + CARD_WIDTH) * (i/3);
            y = GAP + (GAP + CARD_HEIGHT) * (i%3);
            
            SDL_Rect fillRect = { x, y, CARD_WIDTH, CARD_HEIGHT };
            SDL_SetRenderDrawColor( renderer, 0xFF, 0xFF, 0xFF, 0xFF );
            SDL_RenderFillRect( renderer, &fillRect );
        }
        
        
        for (i=0; i<3; i++) {
            int pos = selected_positions[i];
            if (pos >= 0) {
                x = GAP + (GAP + CARD_WIDTH) * (pos/3);
                y = GAP + (GAP + CARD_HEIGHT) * (pos%3);
                SDL_Rect fillRect = { x, y, CARD_WIDTH, CARD_HEIGHT };
                SDL_SetRenderDrawColor( renderer, 0xCC, 0xCC, 0xCC, 0xFF );
                SDL_RenderFillRect( renderer, &fillRect );
            }
        }
        
    }
    
    void draw_card_images() {
        int i;
        for (i=0; i<current_cards.size(); i++) {
            current_cards.at(i).draw_image(renderer);
        }
    }
    
    void draw_score() {
        int w=0, h=0;
        TTF_Font* font = TTF_OpenFont("fonts/sans.ttf", 100);
        SDL_Color Black = {0,0,0};
        SDL_Color Green = {0, 178, 89};
        SDL_Color Red = {238, 58, 67};
        
        SDL_Surface* surface1 = TTF_RenderText_Blended(font, "SCORE: ", Black);
        SDL_Texture* texture1 = SDL_CreateTextureFromSurface(renderer, surface1);
        SDL_QueryTexture(texture1, NULL, NULL, &w, &h);
        
        
        string score_delta_string = "";
        if (score_delta > 0) {
            score_delta_string += "+" + to_string(score_delta);
        } else if (score_delta < 0) {
            score_delta_string += to_string(score_delta);
        }
        
        SDL_Color score_delta_color = (score_delta > 0) ? Green : Red;
        
        SDL_Surface* surface2 = TTF_RenderText_Blended(font, score_delta_string.c_str(), score_delta_color);
        SDL_Texture* texture2 = SDL_CreateTextureFromSurface(renderer, surface2);
        SDL_QueryTexture(texture2, NULL, NULL, &w, &h);
        
        SDL_Surface* surface3 = TTF_RenderText_Blended(font, to_string(abs(score)).c_str(), Black);
        SDL_Texture* texture3 = SDL_CreateTextureFromSurface(renderer, surface3);
        SDL_QueryTexture(texture3, NULL, NULL, &w, &h);

        SDL_Surface* surface4 = TTF_RenderText_Blended(font, "-", Black);
        SDL_Texture* texture4 = SDL_CreateTextureFromSurface(renderer, surface4);
        SDL_QueryTexture(texture4, NULL, NULL, &w, &h);
        
        SDL_Surface* surface5 = TTF_RenderText_Blended(font, "Cards left: ", Black);
        SDL_Texture* texture5 = SDL_CreateTextureFromSurface(renderer, surface5);
        SDL_QueryTexture(texture5, NULL, NULL, &w, &h);
        
        SDL_Surface* surface6 = TTF_RenderText_Blended(font, to_string(get_deck_cards().size()).c_str(), Black);
        SDL_Texture* texture6 = SDL_CreateTextureFromSurface(renderer, surface6);
        SDL_QueryTexture(texture6, NULL, NULL, &w, &h);
        
        SDL_Rect rect1, rect2, rect3, rect4, rect5, rect6;
        rect1.x = 30;
        rect1.y = 450;
        rect1.w = 100;
        rect1.h = 50;
        
        rect2.x = 720;
        rect2.y = 450;
        rect2.w = 10 + (abs(score_delta) > 0 ? (int) log10 ((double) abs(score_delta)) : 0) * 20;
        rect2.h = 50;
        
        rect3.x = score >= 0 ? 130 : 140;
        rect3.y = 450;
        rect3.w = (abs(score) > 0 ? (int) log10 ((double) abs(score)) + 1 : 1) * 15;
        rect3.h = 50;
        
        rect4.x = 130;
        rect4.y = 450;
        rect4.w = 10;
        rect4.h = 50;
        
        rect5.x = 30;
        rect5.y = 500;
        rect5.w = 100;
        rect5.h = 30;
        
        rect6.x = 130;
        rect6.y = 500;
        rect6.w = (get_deck_cards().size() > 0 ? (int) log10 ((double) get_deck_cards().size()) + 1 : 1)*10;
        rect6.h = 30;
        
        SDL_RenderCopy(renderer, texture1, NULL, &rect1);
        SDL_RenderCopy(renderer, texture2, NULL, &rect2);
        SDL_RenderCopy(renderer, texture3, NULL, &rect3);
        SDL_RenderCopy(renderer, texture5, NULL, &rect5);
        SDL_RenderCopy(renderer, texture6, NULL, &rect6);
        
        if (score < 0) {
            SDL_RenderCopy(renderer, texture4, NULL, &rect4);
        }
        
        SDL_FreeSurface(surface1);
        SDL_FreeSurface(surface2);
        SDL_FreeSurface(surface3);
        SDL_FreeSurface(surface4);
        SDL_FreeSurface(surface5);
        SDL_FreeSurface(surface6);

        TTF_CloseFont(font);
    }
    
    void draw() {
        // clear screen (fill with black)
        SDL_SetRenderDrawColor( renderer, 0xCD, 0xEF, 0xFF, 0xFF );
        SDL_RenderClear(renderer);
        
        // draw cards
        draw_card_backgrounds();
        draw_card_images();
        draw_score();
        
        // present everything
        SDL_RenderPresent(renderer);
    }
    
    int third_card_bits(Card card1, Card card2) {
        int x = card1.get_bits();
        int y = card2.get_bits();
        int xor_bits = x^y;
        int swap = ((xor_bits & MASK1) >> 1) | ((xor_bits & MASK0) << 1);
        return (x&y) | (~(x|y) & swap);
    }
    
    bool no_set() {
        int have [256] = {0};
        int i,j;
        for (i=0; i<current_cards.size(); i++) {
            have[current_cards.at(i).get_bits()] = i;
        }
        for (i=0; i<current_cards.size(); i++) {
            for (j=i+1; j<current_cards.size(); j++) {
                int k = have[third_card_bits(current_cards.at(i), current_cards.at(j))];
                if (k > j) {
                    return false;
                }
            }
        }
        return true;
    }
    
    void game_over() {
        over = true;
        // clear screen (fill with black)
        SDL_SetRenderDrawColor( renderer, 0xCD, 0xEF, 0xFF, 0xFF );
        SDL_RenderClear(renderer);
        
        int w=0, h=0;
        TTF_Font* font = TTF_OpenFont("fonts/sans.ttf", 100);
        SDL_Color Black = {0,0,0};
        
        SDL_Surface* surface1 = TTF_RenderText_Blended(font, "Game over! Press any key to restart.", Black);
        SDL_Texture* texture1 = SDL_CreateTextureFromSurface(renderer, surface1);
        SDL_QueryTexture(texture1, NULL, NULL, &w, &h);
        
        SDL_Surface* surface2 = TTF_RenderText_Blended(font, "Final score: ", Black);
        SDL_Texture* texture2 = SDL_CreateTextureFromSurface(renderer, surface2);
        SDL_QueryTexture(texture2, NULL, NULL, &w, &h);
        
        SDL_Surface* surface3 = TTF_RenderText_Blended(font, to_string(score).c_str(), Black);
        SDL_Texture* texture3 = SDL_CreateTextureFromSurface(renderer, surface3);
        SDL_QueryTexture(texture3, NULL, NULL, &w, &h);
        
        SDL_Rect rect1, rect2, rect3;
        rect1.x = 225;
        rect1.y = 300;
        rect1.w = 350;
        rect1.h = 50;
        
        rect2.x = 225;
        rect2.y = 240;
        rect2.w = 130;
        rect2.h = 50;
        
        rect3.x = 360;
        rect3.y = 240;
        rect3.w = (abs(score) > 0 ? (int) log10 ((double) abs(score)) + 1 : 1) * 15;
        rect3.h = 50;
        
        SDL_RenderCopy(renderer, texture1, NULL, &rect1);
        SDL_RenderCopy(renderer, texture2, NULL, &rect2);
        SDL_RenderCopy(renderer, texture3, NULL, &rect3);
        
        SDL_FreeSurface(surface1);
        SDL_FreeSurface(surface2);
        SDL_FreeSurface(surface3);
        
        TTF_CloseFont(font);
        
        SDL_RenderPresent(renderer);
    }
};


void print_cards(vector<Card> cards) {
    int i;
    for (i=0; i<cards.size(); i++) {
        cout << cards.at(i).to_string() << "\n";
    }
}


int get_position_from_event(SDL_Event event) {
    int x,y;
    int grid_x, grid_y;
    int position;
    
    x = event.button.x;
    y = event.button.y;
    grid_x = x / (GAP + CARD_WIDTH);
    grid_y = y / (GAP + CARD_HEIGHT);
    if (x - grid_x * (GAP + CARD_WIDTH) < 20 ||
        y - grid_y * (GAP + CARD_HEIGHT) < 20) {
        return -1;
    }
    
    if (y > (GAP + CARD_HEIGHT) * 3) {
        return -1;
    }
    
    position = grid_x * 3 + grid_y;
    return position;
    
}


int main( int argc, char* args[] ) {
    bool quit = false;
    SDL_Event event;
    
    SDL_Init(SDL_INIT_VIDEO);
    IMG_Init(IMG_INIT_PNG);
    TTF_Init();
    
    SDL_Window * window = SDL_CreateWindow("SET",
                                           SDL_WINDOWPOS_UNDEFINED,
                                           SDL_WINDOWPOS_UNDEFINED,
                                           SCREEN_WIDTH, SCREEN_HEIGHT,
                                           SDL_WINDOW_RESIZABLE | SDL_RENDERER_PRESENTVSYNC);
    SDL_Renderer * renderer = SDL_CreateRenderer(window, -1, SDL_RENDERER_ACCELERATED);
    
    Game *game = new Game();
    while (game->no_set()) {
        cout << "no set, so re-deal" << "\n";
        game->start_game(renderer);
    }
    
    while (!quit)
    {
        SDL_WaitEvent(&event);
        
        switch(event.type)
        {
            case SDL_QUIT:
                quit = true;
                break;
            case SDL_MOUSEBUTTONDOWN:
                int position;
                position = get_position_from_event(event);
                game->toggle_card(position);
                break;
            case SDL_KEYDOWN:
                if (game->is_game_over()) {
                    game->start_game(renderer);
                    while (game->no_set()) {
                        cout << "no set, so re-deal" << "\n";
                        game->start_game(renderer);
                    }
                }
                break;
        }
    }
    
    SDL_DestroyRenderer(renderer);
    SDL_DestroyWindow(window);
    IMG_Quit();
    SDL_Quit();
    
    return 0;
}
