using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ToDoCoreWebAPI.Migrations
{
    /// <inheritdoc />
    public partial class v7_Guid : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_SubTasks_Priorities_TaskPriorityId",
                table: "SubTasks");

            migrationBuilder.DropForeignKey(
                name: "FK_Tasks_Categories_TaskCategoryId",
                table: "Tasks");

            migrationBuilder.DropTable(
                name: "Categories");

            migrationBuilder.DropTable(
                name: "Priorities");

            migrationBuilder.DropIndex(
                name: "IX_Tasks_TaskCategoryId",
                table: "Tasks");

            migrationBuilder.DropIndex(
                name: "IX_SubTasks_TaskPriorityId",
                table: "SubTasks");

            migrationBuilder.DropColumn(
                name: "TaskCategoryId",
                table: "Tasks");

            migrationBuilder.DropColumn(
                name: "TaskPriorityId",
                table: "SubTasks");

            migrationBuilder.AddColumn<string>(
                name: "TaskCategory",
                table: "Tasks",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "TaskPriority",
                table: "SubTasks",
                type: "nvarchar(max)",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "TaskCategory",
                table: "Tasks");

            migrationBuilder.DropColumn(
                name: "TaskPriority",
                table: "SubTasks");

            migrationBuilder.AddColumn<int>(
                name: "TaskCategoryId",
                table: "Tasks",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "TaskPriorityId",
                table: "SubTasks",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateTable(
                name: "Categories",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Categories", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Priorities",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Value = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Priorities", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Tasks_TaskCategoryId",
                table: "Tasks",
                column: "TaskCategoryId");

            migrationBuilder.CreateIndex(
                name: "IX_SubTasks_TaskPriorityId",
                table: "SubTasks",
                column: "TaskPriorityId");

            migrationBuilder.AddForeignKey(
                name: "FK_SubTasks_Priorities_TaskPriorityId",
                table: "SubTasks",
                column: "TaskPriorityId",
                principalTable: "Priorities",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Tasks_Categories_TaskCategoryId",
                table: "Tasks",
                column: "TaskCategoryId",
                principalTable: "Categories",
                principalColumn: "Id");
        }
    }
}
