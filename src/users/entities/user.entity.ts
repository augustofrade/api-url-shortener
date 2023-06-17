import * as bcrypt from "bcrypt";
import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class User {
	@PrimaryGeneratedColumn("uuid")
	id: string;

	@Column()
	username: string;

	@Column({ length: 30, unique: true })
	email: string;

	@Column()
	password: string;

	@Column({ default: false })
	isActive: boolean;

	@Column({ default: new Date() })
	createdAt: Date;

	@Column({ default: false })
	emailConfirmed: boolean;

	@BeforeInsert()
	async hashPassword() {
		const saltFactor = 10;
        const salt = await bcrypt.genSalt(saltFactor);
        const hashedPassword = await bcrypt.hash(this.password, salt);
        this.password = hashedPassword;
	}
}
