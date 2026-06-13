<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('portfolio');
});

Route::get('/shop/{any?}', function () {
    return view('shop');
})->where('any', '.*')->name('shop');
