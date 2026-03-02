using Microsoft.AspNetCore.Mvc;
using backend.Data;
using backend.Models;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class DataController : ControllerBase
{
    private readonly AppDbContext _context;
    public DataController(AppDbContext context) => _context = context;

    [HttpGet]
    public IActionResult GetAll() => Ok(_context.DataEntries.ToList());

    [HttpPost]
    public IActionResult Create(DataEntry entry)
    {
        entry.CreatedAt = DateTime.UtcNow.AddHours(8);
        _context.DataEntries.Add(entry);
        _context.SaveChanges();
        return CreatedAtAction(nameof(GetAll), entry);
    }

    [HttpDelete("{id}")]
    public IActionResult Delete(int id)
    {
        var entry = _context.DataEntries.Find(id);
        if (entry == null) return NotFound();
        _context.DataEntries.Remove(entry);
        _context.SaveChanges();
        return NoContent();
    }

    [HttpDelete("reset")]
    public IActionResult ResetDatabase()
    {
        try
        {
            _context.Database.ExecuteSqlRaw("TRUNCATE TABLE DataEntries");
            return Ok(new { message = "Database reset successfully." });
        }
        catch (Exception ex)
        {
            return BadRequest(ex.Message);
        }
    }
}