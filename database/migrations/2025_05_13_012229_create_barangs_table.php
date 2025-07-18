<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('barang', function (Blueprint $table) {
            $table->id();
            $table->foreignId('prodi_id')->constrained('prodi')->onDelete('cascade');
            $table->foreignId('kategori_id')->constrained('kategori')->onDelete('cascade');
            $table->foreignId('kondisi_id')->constrained('kondisi')->onDelete('cascade');
            $table->foreignId('ruang_id')->constrained('ruang')->onDelete('cascade');
            $table->string('nama_barang', 20)->unique();
            $table->string('slug', 20)->unique();
            $table->string('kode_barang', 20)->unique();
            $table->string('merk', 20)->nullable();
            $table->string('ukuran', 20)->nullable();
            $table->string('bahan', 20)->nullable();
            $table->text('spesifikasi')->nullable();
            // $table->integer('stok_masuk');
            // $table->integer('stok_keluar');
            $table->date('tahun_pengadaan')->nullable();
            $table->text('keterangan');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('barangs');
    }
};