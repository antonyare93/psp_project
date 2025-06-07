CREATE TABLE IF NOT EXISTS "usuario" (
	"id" INTEGER NOT NULL UNIQUE,
	"correo" TEXT NOT NULL UNIQUE,
	"nombre" TEXT NOT NULL,
	"apellidos" TEXT NOT NULL,
	"username" TEXT NOT NULL UNIQUE,
	"tipo_id" INTEGER NOT NULL,
	PRIMARY KEY("id"),
	FOREIGN KEY ("tipo_id") REFERENCES "tipo_usuario"("id")
	ON UPDATE NO ACTION ON DELETE NO ACTION
);

CREATE TABLE IF NOT EXISTS "tipo_usuario" (
	"id" INTEGER NOT NULL UNIQUE,
	"nombre" TEXT NOT NULL,
	PRIMARY KEY("id")
);

CREATE TABLE IF NOT EXISTS "tarea" (
	"id" INTEGER NOT NULL UNIQUE,
	"descripcion" TEXT NOT NULL,
	-- La duración debe ser en minutos
	"duracion" INTEGER NOT NULL DEFAULT 0,
	"usuario_id" INTEGER NOT NULL,
	"etapa_id" INTEGER NOT NULL,
	"interrupcion_id" INTEGER,
	"finalizacion_id" INTEGER,
	PRIMARY KEY("id"),
	FOREIGN KEY ("usuario_id") REFERENCES "usuario"("id")
	ON UPDATE NO ACTION ON DELETE NO ACTION,
	FOREIGN KEY ("interrupcion_id") REFERENCES "interrupcion"("id")
	ON UPDATE NO ACTION ON DELETE NO ACTION,
	FOREIGN KEY ("finalizacion_id") REFERENCES "finalizacion"("id")
	ON UPDATE NO ACTION ON DELETE NO ACTION,
	FOREIGN KEY ("etapa_id") REFERENCES "etapa"("id")
	ON UPDATE NO ACTION ON DELETE NO ACTION
);

CREATE TABLE IF NOT EXISTS "interrupcion" (
	"id" INTEGER NOT NULL UNIQUE,
	"duracion" INTEGER NOT NULL,
	"motivo" TEXT NOT NULL,
	PRIMARY KEY("id")
);

CREATE TABLE IF NOT EXISTS "finalizacion" (
	"id" INTEGER NOT NULL UNIQUE,
	-- Es la duración total de la tarea
	"duracion" INTEGER NOT NULL,
	PRIMARY KEY("id")
);

CREATE TABLE IF NOT EXISTS "etapa" (
	"id" INTEGER NOT NULL UNIQUE,
	"descripcion" TEXT NOT NULL,
	PRIMARY KEY("id")
);
