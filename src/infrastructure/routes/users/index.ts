import routes from '@app/routes';
import { Router } from 'express';
import { getUsers, createUser, updateUser, deleteUser } from '@infrastructure/controllers/users';

const router = Router();

// Ruta para obtener todos los usuarios
router.get(routes.users, getUsers);

// Ruta para crear usuario
router.post(routes.users, createUser);

// Ruta para actualizar usuario
router.put(`${routes.users}/:id`, updateUser);

// Ruta para eliminar usuario
router.delete(`${routes.users}/:id`, deleteUser);

export default router;