# Sonidos — Expedición Matemática

Carpeta para los sonidos del juego. Formatos recomendados: `.mp3` o `.ogg`.

## Nombres sugeridos

| Archivo | Cuándo suena |
|---|---|
| `correct.mp3` | Respuesta correcta |
| `wrong.mp3` | Respuesta incorrecta |
| `zone-complete.mp3` | Zona completada (badge) |
| `interact.mp3` | Al hablar con un NPC |
| `click.mp3` | Botones de la UI |
| `background.mp3` | Música de fondo (loop) |

## Uso en el código

```js
const sound = new Audio('/sounds/correct.mp3')
sound.play()
```
