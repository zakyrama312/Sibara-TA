<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
    Route::get('barang-masuk', function () {
        return Inertia::render('barangMasuk/index');
    })->name('barang-masuk');

    Route::get('/pengguna', function () {
        return Inertia::render('pengguna/index');
    })->name('pengguna.index');
    Route::get('/prodi', function () {
        return Inertia::render('prodi/index');
    })->name('prodi.index');
    Route::get('/ruang', function () {
        return Inertia::render('ruang/index');
    })->name('ruang.index');
    Route::get('/kondisi', function () {
        return Inertia::render('kondisi/index');
    })->name('kondisi.index');
    Route::get('/kategori', function () {
        return Inertia::render('kategori/index');
    })->name('kategori.index');
    Route::get('/data-ruang', function () {
        return Inertia::render('data-ruang/index');
    })->name('data-ruang.index');
    Route::get('/peminjaman-barang', function () {
        return Inertia::render('peminjaman/index');
    })->name('peminjaman.index');
});

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
