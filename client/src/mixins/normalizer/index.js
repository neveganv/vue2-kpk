export const userNormalizer = (User) => ({
    name: User?.name,
    surname: User?.surname,
    email: User?.email,
    phone: User?.phone,
    position: User?.position.type,
    positionTitle: User?.position.title,
  });
  