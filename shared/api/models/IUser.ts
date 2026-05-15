/* 
 * PRISMA SCHEMA
	id String @id @default(cuid())
	name String?
	email String? @unique
	emailVerified DateTime?
	image String?
	accounts Account[]
	sessions Session[]

	createdAt DateTime @default(now())
	displayName String?
	username String @unique 
 * */

export interface IUserDTO {
  id: string;
  name: string | null;
  email: string | null;
  image: string | null;
  displayName: string | null;
  username: string;
}
