<?php

namespace Database\Seeders;

use App\Models\InativosStatus;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class InativosStatusTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        InativosStatus::create(
            [                
                'description' => 'Aguardando pausa',
                'color' => '#ffc107'
            ]);
            InativosStatus::create([
                'description' => 'Pausado - Aguardando pagamento',
                'color' => '#fdee2f'
            ]);
            InativosStatus::create([
                'description' => 'Pago (Recuperado)',
                'color' => '#28a745'
            ]);
            InativosStatus::create([
                'description' => 'Aguardando desativamento definitivo',
                'color' => '#d7bb09'
            ]);
            InativosStatus::create([
                'description' => 'Desativado',
                'color' => '#343a40'
            ]);
            InativosStatus::create([
                'description' => 'Excluído',
                'color' => ''
            ]);
    }
}
